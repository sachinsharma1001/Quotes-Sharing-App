import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { uploadGeneratedUrl, attachmentUrl, updateGeneratedUrl } from '../../businessLogic/Quotes';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const userId = getUserId(event);
  const quoteId = event.pathParameters.quoteId;

  const uploadUrl = await uploadGeneratedUrl(quoteId);
  const url = await attachmentUrl(quoteId);

  await updateGeneratedUrl(userId, quoteId, url);

  return {
    statusCode: 200,
    headers: {
    'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
        uploadUrl: uploadUrl
    })
}
}
