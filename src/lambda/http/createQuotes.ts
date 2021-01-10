import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateQuotesRequest } from '../../requests/CreateQuotesRequest';
import { createQuotes } from '../../businessLogic/Quotes';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const newQuote: CreateQuotesRequest = JSON.parse(event.body)
  const newItem = await createQuotes(userId, newQuote);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        item: newItem
    })
  }
}
