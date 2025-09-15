import HomePage from '../pages/home/home-page-mvp';
import LoginPage from '../pages/auth/login-page';
import RegisterPage from '../pages/auth/register-page';
import StoryDetailPage from '../pages/stories/detail-page';
import AddStoryPage from '../pages/stories/add-story-page';
import OfflineStoriesPage from '../pages/offline/offline-stories-page';
import NotFoundPage from '../pages/not-found-page';

const routes = {
  '/': new HomePage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/stories': new HomePage(),
  '/stories/:id': new StoryDetailPage(),
  '/add-story': new AddStoryPage(),
  '/offline-stories': new OfflineStoriesPage(),
  '/404': new NotFoundPage(),
};

export default routes;
