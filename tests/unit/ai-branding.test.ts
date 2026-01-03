import { describe, it, expect } from 'vitest';
import { generateBrandingStatement } from '@/lib/ai-branding/analyzer';

describe('AI Branding Analyzer', () => {
  it('should generate branding statement for technical depth', () => {
    const strengths = [
      {
        name: 'Technical Depth',
        score: 95,
        description: 'Test description',
        evidence: [],
      },
    ];

    const statement = generateBrandingStatement(strengths);
    expect(statement).toContain('expert developer');
    expect(statement).toContain('technical knowledge');
  });

  it('should generate branding statement for execution speed', () => {
    const strengths = [
      {
        name: 'Execution Speed',
        score: 90,
        description: 'Test description',
        evidence: [],
      },
    ];

    const statement = generateBrandingStatement(strengths);
    expect(statement).toContain('high-velocity');
    expect(statement).toContain('ships quality code');
  });

  it('should generate branding statement for OSS impact', () => {
    const strengths = [
      {
        name: 'Open Source Impact',
        score: 88,
        description: 'Test description',
        evidence: [],
      },
    ];

    const statement = generateBrandingStatement(strengths);
    expect(statement).toContain('open source contributor');
    expect(statement).toContain('community impact');
  });

  it('should generate branding statement for learning speed', () => {
    const strengths = [
      {
        name: 'Learning Speed',
        score: 92,
        description: 'Test description',
        evidence: [],
      },
    ];

    const statement = generateBrandingStatement(strengths);
    expect(statement).toContain('fast learner');
    expect(statement).toContain('rapidly adapts');
  });

  it('should handle empty strengths array', () => {
    const statement = generateBrandingStatement([]);
    expect(statement).toContain('passionate developer');
  });
});
