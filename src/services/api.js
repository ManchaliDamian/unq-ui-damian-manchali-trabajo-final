const API_BASE_URL = 'https://preguntados-api.vercel.app';

export const fetchDifficulties = async () => {
  const response = await fetch(`${API_BASE_URL}/api/difficulty`);
  if (!response.ok) {
    throw new Error('Failed to fetch difficulties');
  }
  return response.json();
};

export const fetchQuestions = async (difficulty) => {
  const url = difficulty
    ? `${API_BASE_URL}/api/questions?difficulty=${difficulty}`
    : `${API_BASE_URL}/api/questions`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
};

export const submitAnswer = async (questionId, option) => {
  const response = await fetch(`${API_BASE_URL}/api/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId, option }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  return response.json();
};
