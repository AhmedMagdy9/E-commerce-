import { Component } from '@angular/core';
import { ExitSiteDirective } from '../../../shared/directives/exit check/exit-site.directive';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [ExitSiteDirective , TranslatePipe ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
