import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AIChat from './AIChat';
import { useChat } from 'ai/react';

// Mock the ai/react hook
jest.mock('ai/react', () => ({
  useChat: jest.fn(),
}));

describe('AIChat Component', () => {
  const mockUseChat = useChat as jest.Mock;

  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: [],
      input: '',
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
      isLoading: false,
    });
  });

  it('renders chat interface correctly', () => {
    render(<AIChat />);
    expect(screen.getByPlaceholderText(/Ask me anything/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('displays conversation history', () => {
    mockUseChat.mockReturnValue({
      messages: [
        { id: '1', role: 'user', content: 'Who are you?' },
        { id: '2', role: 'assistant', content: 'I am an AI assistant.' }
      ],
      input: '',
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: false,
    });

    render(<AIChat />);
    expect(screen.getByText('Who are you?')).toBeInTheDocument();
    expect(screen.getByText('I am an AI assistant.')).toBeInTheDocument();
  });

  it('submits user input correctly', async () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    mockUseChat.mockReturnValue({
      messages: [],
      input: 'Test message',
      handleInputChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<AIChat />);
    
    const form = screen.getByRole('form') || screen.getByTestId('ai-chat-form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
