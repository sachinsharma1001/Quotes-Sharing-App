import 'source-map-support/register';
import * as AWS from 'aws-sdk';
import { QuotesItem } from '../models/QuotesItem';
import { UpdateQuotesRequest } from '../requests/UpdateQuotesRequest';
import { createLogger } from '../utils/logger';

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger("QuotesAccess");

export class QuotesAccess {

    constructor(
        private readonly docClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly quotesTable = process.env.QUOTES_TABLE,
        private readonly quotesIndex = process.env.INDEX_NAME,
    ) {}

    async getQuotesItem(userId: string): Promise<QuotesItem[]> {
        logger.info("Get all quotes items for a current user");
        
        const items = await this.docClient.query({
            TableName: this.quotesTable,
            IndexName: this.quotesIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
            ':userId': userId 
            }
        }).promise();
        const todos = items.Items
        return todos as QuotesItem[];
    }

    async createQuotesItem(newItem: QuotesItem) {
        logger.info("Creating quotes item for user");

        await this.docClient.put({
            TableName: this.quotesTable,
            Item: newItem,
        }).promise()
    }

    async updateQuoteItem(userId: string, quoteId: string, updatedQuote: UpdateQuotesRequest) {
        logger.info("update quote item for user");
        const todo = await this.getByQuoteId(userId, quoteId);

        await this.docClient.update({
            TableName: this.quotesTable,
            Key: {
                userId,
                createdAt: todo.createdAt
            },
            UpdateExpression: 'set #name = :name, description = :description',
            ExpressionAttributeNames: {
              "#name": "name"
            },
            ExpressionAttributeValues: {
              ":name": updatedQuote.name
            }
        }).promise()   
    }

    async deleteQuoteItem(userId: string, quoteId: string) {
        logger.info("Deleting quote item for user");
        const quote = await this.getByQuoteId(userId, quoteId);

        await this.docClient.delete({
            TableName: this.quotesTable,
            Key: {
              userId,
              createdAt: quote.createdAt
            }
        }).promise();
    }

    async updateGeneratedS3Url(userId: string, quoteId: string, attachmentUrl: string) {
        logger.info("Generating s3 url");
        const quote = await this.getByQuoteId(userId, quoteId);
        await this.docClient.update({
            TableName: this.quotesTable,
            Key: {
                userId,
                createdAt: quote.createdAt
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
              ':attachmentUrl': attachmentUrl
            }
        }).promise()
    }

    async getByQuoteId(userId: string, quoteId: string): Promise<QuotesItem> {
        const item = await this.docClient.query({

                TableName: this.quotesTable,
                IndexName: this.quotesIndex,
                KeyConditionExpression: "userId = :userId and quoteId = :quoteId",
                ExpressionAttributeValues: {
                    ":userId": userId,
                    ":quoteId": quoteId
                }
            }).promise();

        if (item.Items.length === 0) {
            throw new Error("Item does not exist");
        }
        return item.Items[0] as QuotesItem;
    }
}