import { NavigationPage } from "./pages/navigation";
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

  switch (window.location.pathname) {
    case '/login':
        console.log('go to LogIn page');
        break;
    case '/signin':
          console.log('go to SignIn page');
          break;
    case '/404':
          console.log('go to 404 Error page');
          break;
    case '/500':
          console.log('go to 500 Error page');
          break;
    case '/chat':
        console.log('go to Chat page');
        break;
    case '/profile':
          console.log('go to Profile page');
          break;
    case '/edit-profile':
          console.log('go to Edit Profile page');
          break;
    case '/change-password':
          console.log('go to Change Password page');
          break;
    default:
        renderDom(navigationPage);
        break;
}
});
