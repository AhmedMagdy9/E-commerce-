import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  constructor() { }



  toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }

  initializeDarkMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }
  
}
