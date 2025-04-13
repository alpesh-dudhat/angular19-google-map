import { Component, Input } from '@angular/core';
import {
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgClass,
} from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgClass, NgSwitchDefault],
  template: `
    <ng-container [ngSwitch]="name">
      <svg
        *ngSwitchCase="'drivingdistance'"
        [ngClass]="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M5 18h6v1H5zM6 4h6v3h6v2.19l3.058-2.69L18 3.81V6h-5V3H6V.81L2.942 3.5 6 6.19zM2 2H1v3h1zm13 20h8v1H1v-6a1.996 1.996 0 0 1 1.505-1.93l.013-.07H1v-1h1.702l.296-1.605A1.829 1.829 0 0 1 4.606 11h6.788a1.829 1.829 0 0 1 1.608 1.395L13.298 14H15v1h-1.518l.013.07A1.996 1.996 0 0 1 15 17zM3.534 15h8.933l-.43-2.342c-.093-.338-.405-.658-.643-.658H4.606c-.238 0-.55.32-.625.576zM3 21H2v1h1zm9 0H4v1h8zm2 0h-1v1h1zm-2-2l1-2h1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1h1l1 2H3a1 1 0 0 1-1-1v2h12v-2a1 1 0 0 1-1 1zM22 5v3h1V5z"
          ></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>

      <svg
        *ngSwitchCase="'close'"
        [ngClass]="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="Menu / Close_MD">
            <path
              id="Vector"
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </g>
      </svg>

      <svg
        *ngSwitchCase="'loader'"
        [ngClass]="size"
        aria-hidden="true"
        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>

     

      <svg *ngSwitchCase="'search'"
      [ngClass]="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

      <svg
        *ngSwitchCase="'menu'"
        [ngClass]="size"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="display: block; fill: none; stroke: currentcolor; stroke-width: 3; overflow: visible;"
      >
        <g fill="none" fill-rule="nonzero">
          <path d="m2 16h28"></path>
          <path d="m2 24h28"></path>
          <path d="m2 8h28"></path>
        </g>
      </svg>

      <svg
        *NgSwitchDefault
        [ngClass]="size"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M20 7h-3V3h1v3h2zM5 19h6v-1H5zm18-1.5v1a1.5 1.5 0 0 1-1.5 1.5H21v2h2v1H1v-6a1.996 1.996 0 0 1 1.505-1.93l.013-.07H1v-1h1.702l.296-1.605A1.829 1.829 0 0 1 4.606 11h6.788a1.829 1.829 0 0 1 1.608 1.395L13.298 14H15v1h-1.518l.013.07A1.996 1.996 0 0 1 15 17v5h5v-4h-.5a1.5 1.5 0 0 1-1.5-1.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 0 .5.5h.5v-3.5a.5.5 0 0 1 1 0V19h.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 1 1 0zM3.534 15h8.933l-.43-2.342c-.093-.338-.405-.658-.643-.658H4.606c-.238 0-.55.32-.625.576zM3 21H2v1h1zm9 0H4v1h8zm2 0h-1v1h1zm-2-2l1-2h1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1h1l1 2H3a1 1 0 0 1-1-1v2h12v-2a1 1 0 0 1-1 1zm1-13a5 5 0 1 1 5 5 5.006 5.006 0 0 1-5-5zm1 0a4 4 0 1 0 4-4 4.005 4.005 0 0 0-4 4z"
          ></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </ng-container>
  `,
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: string = 'w-6 h-6';
}
