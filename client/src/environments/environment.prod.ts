/* ng build -env=prod didn't work.
* I used ng build --prod=true whic built, but didn't seem to use this for the apiurl.
* No sweat-  seems to work fine with the evoronments.ts files
* Wil figure it out another day
*/
export const environment = {
  production: true,
  apiurl:'/',
};
