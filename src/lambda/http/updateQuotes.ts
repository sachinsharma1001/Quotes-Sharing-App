import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateQuotesRequest } from '../../requests/UpdateQuotesRequest';
import { updateQuoteItem } from '../../businessLogic/Quotes';
import { getUserId } from '../utils';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const userId = getUserId(event);
  const quoteId = event.pathParameters.quoteId
  const updatedQuote: UpdateQuotesRequest = JSON.parse(event.body)

  await updateQuoteItem(userId, quoteId, updatedQuote);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
