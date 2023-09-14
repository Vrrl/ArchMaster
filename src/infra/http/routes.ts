import { Router } from '@core/infra/router';
import { v1router as ChallengeRouterV1 } from '@modules/challenge/routes';

const router = new Router();

router.useRouter([ChallengeRouterV1]);

export default router;
