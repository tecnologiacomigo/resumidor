const BASE_URL = 'https://whatsapp.clube.ai';
const API_KEY = '96AD8196869A-4E92-BD1F-ECB7EE223A0F';
const INSTANCE = 'numero02';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY
};

export const searchContact = async (phone) => {
  try {
    const [profileData, messagesData] = await Promise.all([
      fetchProfile(phone),
      fetchMessages(phone)
    ]);

    const messages = processMessages(messagesData);
    
    return {
      profile: profileData,
      messages,
      id: phone
    };
  } catch (error) {
    console.error('Error searching contact:', error);
    throw error;
  }
};

export const fetchProfile = async (phone) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/fetchProfile/${INSTANCE}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        number: phone
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const fetchMessages = async (phone) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/fetchMessages/${INSTANCE}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        number: phone
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

const processMessages = (messagesData) => {
  if (!Array.isArray(messagesData)) {
    return [];
  }

  return messagesData.map(msg => ({
    id: msg.id,
    text: msg.text || msg.caption || '',
    timestamp: msg.timestamp,
    fromMe: msg.fromMe,
    sender: msg.sender || 'Unknown'
  }));
};
