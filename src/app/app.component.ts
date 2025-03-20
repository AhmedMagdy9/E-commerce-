import { DarkmodeService } from './core/services/darkmode/darkmode.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flobite/flobite.service';
import { NavbarComponent } from "./features/layout/navbar/navbar.component";
import { FooterComponent } from "./features/layout/footer/footer.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { MyTranslateService } from './core/services/myTranslate/my-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PlatformService } from './core/services/platform/platform.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent , NgxSpinnerModule   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 private  translateService = inject(TranslateService)


    


 constructor(private flowbiteService: FlowbiteService) {this.translateService.setDefaultLang('en')}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);

    });
    
   
   
  }





  

}
