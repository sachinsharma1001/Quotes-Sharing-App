import 'source-map-support/register';
import * as uuid from 'uuid';
import { QuotesAccess } from '../dataLayer/QuotesAccess';
import { QuotesAws } from '../dataLayer/QuotesAws';
import { QuotesItem } from '../models/QuotesItem';
import { CreateQuotesRequest } from '../requests/CreateQuotesRequest';
import { UpdateQuotesRequest } from '../requests/UpdateQuotesRequest';

const quotesAccess = new QuotesAccess();
const quotesAws = new QuotesAws();

export async function getQuotes(userId: string): Promise<QuotesItem[]> {
    return await quotesAccess.getQuotesItem(userId);
}

export async function createQuotes(userId: string, quoteItem: CreateQuotesRequest): Promise<QuotesItem> {
    const quoteId = uuid.v4();

    const newItem = {
        userId,
        quoteId,
        createdAt: new Date().toISOString(),
        attachmentUrl: null,
        ...quoteItem
    }
    console.log("new item: " + newItem);
    await quotesAccess.createQuotesItem(newItem)
    return newItem
}

export async function updateQuoteItem(userId: string, quoteId: string, updatedQuote: UpdateQuotesRequest) {
    await quotesAccess.updateQuoteItem(userId, quoteId, updatedQuote);
}

export async function deleteQuote(userId: string, quoteId: string) {
    await quotesAccess.deleteQuoteItem(userId, quoteId);
}

export async function uploadGeneratedUrl(quoteId: string): Promise<string> {
    const url = await quotesAws.uploadGeneratedUrl(quoteId);
    return url;
}

export async function attachmentUrl(quoteId: string): Promise<string> {
    const url = await quotesAws.attachmentUrl(quoteId);
    return url;
}

export async function updateGeneratedUrl(userId: string, quoteId: string, url: string) {
    await quotesAccess.updateGeneratedS3Url(userId, quoteId, url);
}