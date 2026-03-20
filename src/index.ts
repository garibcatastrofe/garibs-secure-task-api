import { app } from './app';
import { ClsEnvironmentContainer } from './Shared/Infrastructure/ClsEnvironmentContainer';

const env = ClsEnvironmentContainer.getInstance();
app.listen(env.PORT, () => {
  console.warn(`Server listen on http://localhost:${env.PORT}`);
});
