import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// import { IonicPageModule } from '@ionic/angular';
import { UserTypeSelectionPage } from './user-type-selection';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserTypeSelectionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserTypeSelectionPage
      },
      {
        path: 'user-type-selection/:isChangeRoleRequest',
        component: UserTypeSelectionPage
      }
    ]),
    // IonicPageModule.forChild(UserTypeSelectionPage),
    TranslateModule.forChild()
  ],
  exports: [
    UserTypeSelectionPage
  ],
})
export class UserTypeSelectionPageModule {}
