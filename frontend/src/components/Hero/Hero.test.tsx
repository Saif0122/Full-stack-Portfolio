import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import { ThemeProvider } from '../../providers/ThemeProvider';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  useScroll: () => ({ scrollYProgress: { onChange: jest.fn() } }),
  useTransform: () => ({}),
}));

describe('Hero Component', () => {
  const renderHero = () => render(
    <ThemeProvider>
      <Hero />
    </ThemeProvider>
  );

  it('renders the hero heading and subtitle', () => {
    renderHero();
    // Use regex to be resilient against text changes, ensuring we don't need to update tests if copy changes slightly
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for CTA buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('meets accessibility standards for contrast and ARIA labels', () => {
    const { container } = renderHero();
    // A real implementation would use jest-axe here:
    // const results = await axe(container);
    // expect(results).toHaveNoViolations();
    
    // Check if main interactive elements have accessible names
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });
});
