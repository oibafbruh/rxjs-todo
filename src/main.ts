import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


const asciiArt = `
      ..                                                     
    ....                                                     
    ....                                                     
      ..                                 ..         ..       
   .+-                  .....  -###- -+#++#++-  -+#+#+#+-    
   .++++                ....   -++#++#+##++#+#++#+##++#++.   
   .++##.              ....    -#++#+-    ++#+#+-   .++#+.   
   .+++#.   ..        ....     -#+#+      +++#-      +#++-   
   .+#+#.    ...      ....     -++#+      ++#+-      ++#+.   
   .+++#.     ....   ....      -+#++      +++#-      ++++-   
   .++#+.      .... ....       -++#+      ++#+-      +#++.   
   .+++#.       .......        -+#++      +++#-      ++#+-   
   .+#+#.        ......        -++#+      ++#+-      ++++.   
    ----          ...          .----      ----.      ----. 

    Testprojekt von Fabio Bauer, IVM GmbH.
    https://www.verwaltungsmanagement.at/
`;

console.log(asciiArt);