import { describe, expect, it } from 'vitest';
import { ChallengeTitle } from './challenge-title';

describe('Challenge Title Object', () => {
  it('should instantiate a challenge title', () => {
    const title = 'New challenge Advanced';

    const sut = ChallengeTitle.create({ title });

    expect(sut).toBeInstanceOf(ChallengeTitle);
  });

  it('should not instantiate a number challenge title', () => {
    const title = 'New challenge Advanced with a really large title that should not be allowed in this';

    expect(() => {
      ChallengeTitle.create({ title });
    }).toThrow();
  });
});
