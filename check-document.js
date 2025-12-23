// Quick script to check if a document exists and can be fetched
// Run with: node check-document.js

const { Client, Databases, Query } = require('node-appwrite');

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite-prod.cloud3.appetite.studio/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const apiKey = process.env.APPWRITE_API_KEY;

const documentId = '694a86b8000bc23e1ade';

if (!projectId || !databaseId || !collectionId) {
  console.error('Missing environment variables!');
  console.log('Required: NEXT_PUBLIC_APPWRITE_PROJECT_ID, NEXT_PUBLIC_APPWRITE_DATABASE_ID, NEXT_PUBLIC_APPWRITE_COLLECTION_ID');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

if (apiKey) {
  client.setKey(apiKey);
}

const databases = new Databases(client);

async function checkDocument() {
  try {
    console.log('Checking document:', documentId);
    console.log('Database:', databaseId);
    console.log('Collection:', collectionId);
    console.log('---');
    
    // Try to get the specific document
    try {
      const doc = await databases.getDocument(databaseId, collectionId, documentId);
      console.log('✅ Document found!');
      console.log('Document data:', JSON.stringify(doc, null, 2));
      console.log('---');
    } catch (error) {
      console.log('❌ Error fetching specific document:', error.message);
      console.log('---');
    }
    
    // Check total count
    const allDocs = await databases.listDocuments(
      databaseId,
      collectionId,
      [Query.limit(100)]
    );
    
    console.log(`Total documents in collection: ${allDocs.total}`);
    console.log(`Documents returned: ${allDocs.documents.length}`);
    console.log('---');
    
    // Check if the document is in the list
    const foundDoc = allDocs.documents.find(d => d.$id === documentId);
    if (foundDoc) {
      console.log('✅ Document found in list!');
      console.log('Status:', foundDoc['entry-status']);
      console.log('Name:', foundDoc['Asset-Name']);
    } else {
      console.log('❌ Document NOT found in first 100 documents');
      console.log('This might be a pagination issue. Checking document IDs...');
      const docIds = allDocs.documents.map(d => d.$id);
      console.log('First few document IDs:', docIds.slice(0, 5));
    }
    
    // Try with higher limit
    if (allDocs.total > 100) {
      console.log('---');
      console.log('Fetching with limit 500...');
      const moreDocs = await databases.listDocuments(
        databaseId,
        collectionId,
        [Query.limit(500)]
      );
      const foundInMore = moreDocs.documents.find(d => d.$id === documentId);
      if (foundInMore) {
        console.log('✅ Document found when fetching 500 documents!');
        console.log('This confirms it\'s a pagination/limit issue');
      } else {
        console.log('❌ Still not found in 500 documents');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDocument();


