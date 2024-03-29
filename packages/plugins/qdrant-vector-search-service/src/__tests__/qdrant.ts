import { AppNameDefinitions, IVectorDB } from '@ocular/types';
import qdrantService from '../services/qdrant';
import { QdrantClient } from '@qdrant/js-client-rest';

describe('qdrantService', () => {
  let service: IVectorDB;
  beforeEach(() => {
    service = new qdrantService({}, { quadrant_db_url: 'http://localhost:6333', embedding_size: 3 });
  });


  it('should add a document', async () => {
    const mockDoc = [{
      id: '3e6c4e66-7b8a-4b2c-9e4f-4f4e6def971f',
      organisationId: 'org1',
      title: 'title',
      titleVector:  [1, 2, 3],
      source: AppNameDefinitions.ASANA,
      content: 'content',
      contentVector:  [1, 2, 3],
      metadata: "",
      updatedAt: new Date("2024-03-27T09:37:44.474Z"),
    }];

    const resultDoc = [{
      id: '3e6c4e66-7b8a-4b2c-9e4f-4f4e6def971f',
      organisationId: 'org1',
      title: 'title',
      source: AppNameDefinitions.ASANA,
      content: 'content',
      metadata: "",
      updatedAt: "2024-03-27T09:37:44.474Z",
    },
    null];

    await service.addDocuments("org1",mockDoc);

    const mockVector = [1, 2, 3];
    const result = await service.searchDocuments('org1', mockVector);
    expect(result).toEqual(resultDoc);
  })})