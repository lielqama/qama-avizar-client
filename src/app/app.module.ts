import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServerService, FamilyFilterPipe } from './services/service';
import { SecureHttp } from './services/SecureHttp';
import { AuthenticationService } from './services/Authentication';
import { LoadingComponent } from './components/loading/loading.component';
import { ShaerdStrings } from './entities/Helprs';
import { CartComponent } from './components/cart/cart.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ExportAsModule } from 'ngx-export-as';
import { AuthGuard } from './guards/authguard';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FileLinkPipe } from './file-link.pipe';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { CustFilterPipe } from './cust-filter.pipe';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LogpartsComponent } from './pages/logparts/logparts.component';

import { HttpModule } from '@angular/http';
import { AddIconComponent } from './components/add-icon/add-icon.component';

import { ShowLogpartComponent } from './components/show-logpart/show-logpart.component';

import { NonzeroPipe } from './pipe/nonzero.pipe';

import { SortByCustNamePipe } from './pipe/sort-by-cust-name.pipe';

import { NumberInputComponent } from './components/inputs/number-input/number-input.component';
import { SelectInputComponent } from './components/inputs/select-input/select-input.component';
import { FormsModule } from '@angular/forms';
import { SearchSelectFilterPipe } from './pipes/search-select-filter.pipe';
import { SearchSupplierPipe } from './pipes/search-supplier.pipe';
import { SearchSelectComponent } from './components/search-select/search-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    MenuComponent,
    LoadingComponent,
    CartComponent,
    FamilyFilterPipe,
    SafeHtmlPipe,
    FileLinkPipe,
    CustFilterPipe,
    MainPageComponent,
    LogpartsComponent,

    AddIconComponent,
    ShowLogpartComponent,
    NonzeroPipe,
    SortByCustNamePipe,
    NumberInputComponent,
    SelectInputComponent,

    SearchSelectComponent,
  
    SearchSelectFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiSwitchModule,
    ExportAsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,

   
  ],
  providers: [{ provide: LOCALE_ID, useValue: "he" },ShaerdStrings, ServerService, SecureHttp, AuthenticationService, AuthGuard, HttpClient],
  bootstrap: [AppComponent]
})
 
export class AppModule { }
