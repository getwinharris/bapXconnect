<?php

namespace bapXdb\Platform\Modules\Databases\Services\Registry;

use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Boolean\Create as CreateBooleanAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Boolean\Update as UpdateBooleanAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Datetime\Create as CreateDatetimeAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Datetime\Update as UpdateDatetimeAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Delete as DeleteAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Email\Create as CreateEmailAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Email\Update as UpdateEmailAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Enum\Create as CreateEnumAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Enum\Update as UpdateEnumAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Float\Create as CreateFloatAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Float\Update as UpdateFloatAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Get as GetAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Integer\Create as CreateIntegerAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Integer\Update as UpdateIntegerAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\IP\Create as CreateIPAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\IP\Update as UpdateIPAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Line\Create as CreateLineAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Line\Update as UpdateLineAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Point\Create as CreatePointAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Point\Update as UpdatePointAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Polygon\Create as CreatePolygonAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Polygon\Update as UpdatePolygonAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Relationship\Create as CreateRelationshipAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\Relationship\Update as UpdateRelationshipAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\String\Create as CreateStringAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\String\Update as UpdateStringAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\URL\Create as CreateURLAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\URL\Update as UpdateURLAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Attributes\XList as ListAttributes;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Create as CreateCollection;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Delete as DeleteCollection;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Attribute\Decrement as DecrementDocumentAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Attribute\Increment as IncrementDocumentAttribute;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Bulk\Delete as DeleteDocuments;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Bulk\Update as UpdateDocuments;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Bulk\Upsert as UpsertDocuments;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Create as CreateDocument;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Delete as DeleteDocument;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Get as GetDocument;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Logs\XList as ListDocumentLogs;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Update as UpdateDocument;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\Upsert as UpsertDocument;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Documents\XList as ListDocuments;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Get as GetCollection;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Indexes\Create as CreateIndex;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Indexes\Delete as DeleteIndex;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Indexes\Get as GetIndex;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Indexes\XList as ListIndexes;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Logs\XList as ListCollectionLogs;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Update as UpdateCollection;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\Usage\Get as GetCollectionUsage;
use bapXdb\Platform\Modules\Databases\Http\Databases\Collections\XList as ListCollections;
use bapXdb\Platform\Modules\Databases\Http\Databases\Create as CreateDatabase;
use bapXdb\Platform\Modules\Databases\Http\Databases\Delete as DeleteDatabase;
use bapXdb\Platform\Modules\Databases\Http\Databases\Get as GetDatabase;
use bapXdb\Platform\Modules\Databases\Http\Databases\Logs\XList as ListDatabaseLogs;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Create as CreateTransaction;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Delete as DeleteTransaction;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Get as GetTransaction;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Operations\Create as CreateOperations;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Update as UpdateTransaction;
use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\XList as ListTransactions;
use bapXdb\Platform\Modules\Databases\Http\Databases\Update as UpdateDatabase;
use bapXdb\Platform\Modules\Databases\Http\Databases\Usage\Get as GetDatabaseUsage;
use bapXdb\Platform\Modules\Databases\Http\Databases\Usage\XList as ListDatabaseUsage;
use bapXdb\Platform\Modules\Databases\Http\Databases\XList as ListDatabases;
use Utopia\Platform\Service;

/**
 * Registers all HTTP actions related to collections in the database module.
 *
 * This includes:
 * - Collections
 * - Documents
 * - Attributes
 * - Indexes
 * - Transactions
 */
class Legacy extends Base
{
    protected function register(Service $service): void
    {
        $this->registerDatabaseActions($service);
        $this->registerCollectionActions($service);
        $this->registerDocumentActions($service);
        $this->registerAttributeActions($service);
        $this->registerIndexActions($service);
        $this->registerTransactionActions($service);
    }

    public function registerDatabaseActions(Service $service): void
    {
        $service->addAction(CreateDatabase::getName(), new CreateDatabase());
        $service->addAction(GetDatabase::getName(), new GetDatabase());
        $service->addAction(UpdateDatabase::getName(), new UpdateDatabase());
        $service->addAction(DeleteDatabase::getName(), new DeleteDatabase());
        $service->addAction(ListDatabases::getName(), new ListDatabases());
        $service->addAction(ListDatabaseLogs::getName(), new ListDatabaseLogs());
        $service->addAction(GetDatabaseUsage::getName(), new GetDatabaseUsage());
        $service->addAction(ListDatabaseUsage::getName(), new ListDatabaseUsage());
    }

    private function registerCollectionActions(Service $service): void
    {
        $service->addAction(CreateCollection::getName(), new CreateCollection());
        $service->addAction(GetCollection::getName(), new GetCollection());
        $service->addAction(UpdateCollection::getName(), new UpdateCollection());
        $service->addAction(DeleteCollection::getName(), new DeleteCollection());
        $service->addAction(ListCollections::getName(), new ListCollections());
        $service->addAction(ListCollectionLogs::getName(), new ListCollectionLogs());
        $service->addAction(GetCollectionUsage::getName(), new GetCollectionUsage());
    }

    private function registerDocumentActions(Service $service): void
    {
        $service->addAction(CreateDocument::getName(), new CreateDocument());
        $service->addAction(GetDocument::getName(), new GetDocument());
        $service->addAction(UpdateDocument::getName(), new UpdateDocument());
        $service->addAction(UpdateDocuments::getName(), new UpdateDocuments());
        $service->addAction(UpsertDocument::getName(), new UpsertDocument());
        $service->addAction(UpsertDocuments::getName(), new UpsertDocuments());
        $service->addAction(DeleteDocument::getName(), new DeleteDocument());
        $service->addAction(DeleteDocuments::getName(), new DeleteDocuments());
        $service->addAction(ListDocuments::getName(), new ListDocuments());
        $service->addAction(ListDocumentLogs::getName(), new ListDocumentLogs());
        $service->addAction(IncrementDocumentAttribute::getName(), new IncrementDocumentAttribute());
        $service->addAction(DecrementDocumentAttribute::getName(), new DecrementDocumentAttribute());

    }

    private function registerAttributeActions(Service $service): void
    {
        // Attribute top-level actions
        $service->addAction(GetAttribute::getName(), new GetAttribute());
        $service->addAction(DeleteAttribute::getName(), new DeleteAttribute());
        $service->addAction(ListAttributes::getName(), new ListAttributes());

        // Attribute: Boolean
        $service->addAction(CreateBooleanAttribute::getName(), new CreateBooleanAttribute());
        $service->addAction(UpdateBooleanAttribute::getName(), new UpdateBooleanAttribute());

        // Attribute: Datetime
        $service->addAction(CreateDatetimeAttribute::getName(), new CreateDatetimeAttribute());
        $service->addAction(UpdateDatetimeAttribute::getName(), new UpdateDatetimeAttribute());

        // Attribute: Email
        $service->addAction(CreateEmailAttribute::getName(), new CreateEmailAttribute());
        $service->addAction(UpdateEmailAttribute::getName(), new UpdateEmailAttribute());

        // Attribute: Enum
        $service->addAction(CreateEnumAttribute::getName(), new CreateEnumAttribute());
        $service->addAction(UpdateEnumAttribute::getName(), new UpdateEnumAttribute());

        // Attribute: Float
        $service->addAction(CreateFloatAttribute::getName(), new CreateFloatAttribute());
        $service->addAction(UpdateFloatAttribute::getName(), new UpdateFloatAttribute());

        // Attribute: Integer
        $service->addAction(CreateIntegerAttribute::getName(), new CreateIntegerAttribute());
        $service->addAction(UpdateIntegerAttribute::getName(), new UpdateIntegerAttribute());

        // Attribute: IP
        $service->addAction(CreateIPAttribute::getName(), new CreateIPAttribute());
        $service->addAction(UpdateIPAttribute::getName(), new UpdateIPAttribute());

        // Attribute: Line
        $service->addAction(CreateLineAttribute::getName(), new CreateLineAttribute());
        $service->addAction(UpdateLineAttribute::getName(), new UpdateLineAttribute());

        // Attribute: Point
        $service->addAction(CreatePointAttribute::getName(), new CreatePointAttribute());
        $service->addAction(UpdatePointAttribute::getName(), new UpdatePointAttribute());

        // Attribute: Polygon
        $service->addAction(CreatePolygonAttribute::getName(), new CreatePolygonAttribute());
        $service->addAction(UpdatePolygonAttribute::getName(), new UpdatePolygonAttribute());

        // Attribute: Relationship
        $service->addAction(CreateRelationshipAttribute::getName(), new CreateRelationshipAttribute());
        $service->addAction(UpdateRelationshipAttribute::getName(), new UpdateRelationshipAttribute());

        // Attribute: String
        $service->addAction(CreateStringAttribute::getName(), new CreateStringAttribute());
        $service->addAction(UpdateStringAttribute::getName(), new UpdateStringAttribute());

        // Attribute: URL
        $service->addAction(CreateURLAttribute::getName(), new CreateURLAttribute());
        $service->addAction(UpdateURLAttribute::getName(), new UpdateURLAttribute());
    }

    private function registerIndexActions(Service $service): void
    {
        $service->addAction(CreateIndex::getName(), new CreateIndex());
        $service->addAction(GetIndex::getName(), new GetIndex());
        $service->addAction(DeleteIndex::getName(), new DeleteIndex());
        $service->addAction(ListIndexes::getName(), new ListIndexes());
    }

    private function registerTransactionActions(Service $service): void
    {
        $service->addAction(CreateTransaction::getName(), new CreateTransaction());
        $service->addAction(GetTransaction::getName(), new GetTransaction());
        $service->addAction(UpdateTransaction::getName(), new UpdateTransaction());
        $service->addAction(DeleteTransaction::getName(), new DeleteTransaction());
        $service->addAction(ListTransactions::getName(), new ListTransactions());
        $service->addAction(CreateOperations::getName(), new CreateOperations());
    }
}
