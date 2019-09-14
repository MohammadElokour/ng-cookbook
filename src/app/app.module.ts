import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes.module';

const routes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: "full" },
  { path: '', loadChildren: './recipes/recipes.module#RecipesModule' }
]




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CoreModule,
    SharedModule,
    RecipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
