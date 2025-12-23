'use client';

import { Client, Account } from 'appwrite';

// Initialize Appwrite client
function getAppwriteClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  
  if (!endpoint || !projectId) {
    throw new Error('Appwrite configuration missing: NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID are required');
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  return client;
}

// Get Account instance
export function getAccount() {
  const client = getAppwriteClient();
  return new Account(client);
}

// Login with email and password
export async function login(email: string, password: string) {
  const account = getAccount();
  return await account.createEmailPasswordSession(email, password);
}

// Get current session
export async function getSession() {
  const account = getAccount();
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

// Logout
export async function logout() {
  const account = getAccount();
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await getSession();
    return session !== null;
  } catch (error) {
    return false;
  }
}

