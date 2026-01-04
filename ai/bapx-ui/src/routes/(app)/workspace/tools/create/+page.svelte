<script>
	import { goto } from '$app/navigation';
	import { createNewTool, getTools } from '$lib/apis/tools';
	import ToolkitEditor from '$lib/components/workspace/Tools/ToolkitEditor.svelte';
	import { BAPX_UI_VERSION } from '$lib/constants';
	import { tools } from '$lib/stores';
	import { compareVersion, extractFrontmatter } from '$lib/utils';
	import { onMount, getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	const i18n = getContext('i18n');

	let mounted = false;
	let clone = false;
	let tool = null;

	const saveHandler = async (data) => {
		console.log(data);

		const manifest = extractFrontmatter(data.content);
		if (compareVersion(manifest?.required_bapx_ui_version ?? '0.0.0', BAPX_UI_VERSION)) {
			console.log('Version is lower than required');
			toast.error(
				$i18n.t(
					'bapX AI version (v{{OPEN_BAPX_UI_VERSION}}) is lower than required version (v{{REQUIRED_VERSION}})',
					{
						OPEN_BAPX_UI_VERSION: BAPX_UI_VERSION,
						REQUIRED_VERSION: manifest?.required_bapx_ui_version ?? '0.0.0'
					}
				)
			);
			return;
		}

		const res = await createNewTool(localStorage.token, {
			id: data.id,
			name: data.name,
			meta: data.meta,
			content: data.content,
			access_control: data.access_control
		}).catch((error) => {
			toast.error(`${error}`);
			return null;
		});

		if (res) {
			toast.success($i18n.t('Tool created successfully'));
			tools.set(await getTools(localStorage.token));

			await goto('/workspace/tools');
		}
	};

	onMount(() => {
		window.addEventListener('message', async (event) => {
			if (
				!['https://openbapx_ui.com', 'https://www.openbapx_ui.com', 'http://localhost:9999'].includes(
					event.origin
				)
			)
				return;

			tool = JSON.parse(event.data);
			console.log(tool);
		});

		if (window.opener ?? false) {
			window.opener.postMessage('loaded', '*');
		}

		if (sessionStorage.tool) {
			tool = JSON.parse(sessionStorage.tool);
			sessionStorage.removeItem('tool');

			console.log(tool);
			clone = true;
		}

		mounted = true;
	});
</script>

{#if mounted}
	{#key tool?.content}
		<ToolkitEditor
			id={tool?.id ?? ''}
			name={tool?.name ?? ''}
			meta={tool?.meta ?? { description: '' }}
			content={tool?.content ?? ''}
			accessControl={tool?.access_control !== undefined ? tool.access_control : {}}
			{clone}
			onSave={(value) => {
				saveHandler(value);
			}}
		/>
	{/key}
{/if}
