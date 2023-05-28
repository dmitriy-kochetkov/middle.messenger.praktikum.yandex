import { NavigationPage } from "./pages/navigation";
import { LoginPage } from "./pages/login";
import renderDom from "./utils/renderDom";

window.addEventListener('DOMContentLoaded', () => {
  const pages = [
    {link: '/login', label: 'LogIn'},
    {link: '/signin', label: 'SignIn'},
    {link: '/404', label: '404'},
    {link: '/500', label: '500'},
    {link: '/chat', label: 'Chat'},
    {link: '/profile', label: 'Profile'},
    {link: '/edit-profile', label: 'Edit Profile'},
    {link: '/change-password', label: 'Change Password'},
  ]

  const navigationPage = new NavigationPage({ pages });
  const loginPage = new LoginPage({});

  switch (window.location.pathname) {
    case '/login':
        renderDom(loginPage);
        break;
    case '/signin':
          console.log('go to SignIn page');
          renderDom(navigationPage);
          break;
    case '/404':
          console.log('go to 404 Error page');
          renderDom(navigationPage);
          break;
    case '/500':
          console.log('go to 500 Error page');
          renderDom(navigationPage);
          break;
    case '/chat':
        console.log('go to Chat page');
        renderDom(navigationPage);
        break;
    case '/profile':
          console.log('go to Profile page');
          renderDom(navigationPage);
          break;
    case '/edit-profile':
          console.log('go to Edit Profile page');
          renderDom(navigationPage);
          break;
    case '/change-password':
          console.log('go to Change Password page');
          renderDom(navigationPage);
          break;
    default:
        renderDom(navigationPage);
        break;
}
});
