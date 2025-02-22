// Angular dependencies
import { NgModule, Provider, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// ionic cordova dependencies/plugins
import { IonicImageLoader } from 'ionic-image-loader';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';

// 3rd party dependencies
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// app dependencies like directive, sdk, services etc
import {SunbirdSdk} from 'sunbird-sdk';
import {DirectivesModule} from '../directives/directives.module';
import {
  AppGlobalService,
  CommonUtilService,
  CourseUtilService,
  TelemetryGeneratorService,
  QRScannerResultHandler,
  UtilityService,
  AppHeaderService,
  AppRatingService,
  LogoutHandlerService,
  TncUpdateHandlerService,
  ContainerService,
  AndroidPermissionsService,
  ComingSoonMessageService,
  NotificationService,
  SunbirdQRScanner
} from '../services/index';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LanguageSettingsPageModule } from './language-settings/language-settings.module';
import { UserTypeSelectionPageModule } from './user-type-selection/user-type-selection.module';
import { ComponentsModule } from './components/components.module';



// AoT requires an exported function for factories
export function translateHttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const authService = () => {
  return SunbirdSdk.instance.authService;
};
export const pageAssembleService = () => {
  return SunbirdSdk.instance.pageAssembleService;
};
export const dbService = () => {
  return SunbirdSdk.instance.dbService;
};
export const courseService = () => {
  return SunbirdSdk.instance.courseService;
};
export const sharedPreferences = () => {
  return SunbirdSdk.instance.sharedPreferences;
};
export const apiService = () => {
  return SunbirdSdk.instance.apiService;
};
export const profileService = () => {
  return SunbirdSdk.instance.profileService;
};
export const groupService = () => {
  return SunbirdSdk.instance.groupService;
};
export const frameworkService = () => {
  return SunbirdSdk.instance.frameworkService;
};
export const frameworkUtilService = () => {
  return SunbirdSdk.instance.frameworkUtilService;
};
export const systemSettingsService = () => {
  return SunbirdSdk.instance.systemSettingsService;
};
export const telemetryService = () => {
  return SunbirdSdk.instance.telemetryService;
};
export const contentService = () => {
  return SunbirdSdk.instance.contentService;
};
export const contentFeedbackService = () => {
  return SunbirdSdk.instance.contentFeedbackService;
};
export const summarizerService = () => {
  return SunbirdSdk.instance.summarizerService;
};
export const eventsBusService = () => {
  return SunbirdSdk.instance.eventsBusService;
};
export const deviceInfo = () => {
  return SunbirdSdk.instance.deviceInfo;
};
export const playerService = () => {
  return SunbirdSdk.instance.playerService;
};
export const formService = () => {
  return SunbirdSdk.instance.formService;
};
export const downloadService = () => {
  return SunbirdSdk.instance.downloadService;
};

export function sdkDriverFactory(): any {
  return [{
    provide: 'SDK_CONFIG',
    useFactory: authService
  }, {
    provide: 'AUTH_SERVICE',
    useFactory: authService
  }, {
    provide: 'DB_SERVICE',
    useFactory: dbService
  }, {
    provide: 'COURSE_SERVICE',
    useFactory: courseService
  }, {
    provide: 'SHARED_PREFERENCES',
    useFactory: sharedPreferences
  }, {
    provide: 'API_SERVICE',
    useFactory: apiService
  }, {
    provide: 'PAGE_ASSEMBLE_SERVICE',
    useFactory: pageAssembleService
  }, {
    provide: 'GROUP_SERVICE',
    useFactory: groupService
  }, {
    provide: 'PROFILE_SERVICE',
    useFactory: profileService
  }, {
    provide: 'DB_SERVICE',
    useFactory: dbService
  }, {
    provide: 'FRAMEWORK_SERVICE',
    useFactory: frameworkService
  }, {
    provide: 'FRAMEWORK_UTIL_SERVICE',
    useFactory: frameworkUtilService
  }, {
    provide: 'PAGE_ASSEMBLE_SERVICE',
    useFactory: pageAssembleService
  }, {
    provide: 'FORM_SERVICE',
    useFactory: formService
  }, {
    provide: 'SYSTEM_SETTINGS_SERVICE',
    useFactory: systemSettingsService
  }, {
    provide: 'TELEMETRY_SERVICE',
    useFactory: telemetryService
  }, {
    provide: 'CONTENT_SERVICE',
    useFactory: contentService
  }, {
    provide: 'CONTENT_FEEDBACK_SERVICE',
    useFactory: contentFeedbackService
  }, {
    provide: 'SUMMARIZER_SERVICE',
    useFactory: summarizerService
  }, {
    provide: 'EVENTS_BUS_SERVICE',
    useFactory: eventsBusService
  }, {
    provide: 'DEVICE_INFO',
    useFactory: deviceInfo
  }, {
    provide: 'PLAYER_SERVICE',
    useFactory: playerService
  }, {
    provide: 'DOWNLOAD_SERVICE',
    useFactory: downloadService
  }
  ];
};
export const sunbirdSdkServicesProvidersFactory: () => Provider[] = sdkDriverFactory;

export const sunbirdSdkFactory =
  () => {
    return async () => {
      const buildConfigValues = JSON.parse(await new Promise<string>((resolve, reject) => {
        buildconfigreader.getBuildConfigValues('org.sunbird.app', (v) => {
          resolve(v);
        }, (err) => {
          reject(err);
        });
      }));

      await SunbirdSdk.instance.init({
        fileConfig: {
          debugMode: false
        },
        apiConfig: {
          debugMode: false,
          host: buildConfigValues.BASE_URL,
          user_authentication: {
            redirectUrl: buildConfigValues.OAUTH_REDIRECT_URL,
            authUrl: '/auth/realms/sunbird/protocol/openid-connect',
          },
          api_authentication: {
            mobileAppKey: buildConfigValues.MOBILE_APP_KEY,
            mobileAppSecret: buildConfigValues.MOBILE_APP_SECRET,
            mobileAppConsumer: buildConfigValues.MOBILE_APP_CONSUMER,
            channelId: buildConfigValues.CHANNEL_ID,
            producerId: buildConfigValues.PRODUCER_ID,
            producerUniqueId: 'sunbird.app'
          },
          cached_requests: {
            timeToLive: 30 * 60 * 60 * 1000
          }
        },
        eventsBusConfig: {
          debugMode: true
        },
        dbConfig: {
          debugMode: false,
          dbName: 'GenieServices.db'
        },
        contentServiceConfig: {
          apiPath: '/api/content/v1',
          searchApiPath: '/api/composite/v1'
        },
        courseServiceConfig: {
          apiPath: '/api/course/v1'
        },
        formServiceConfig: {
          apiPath: '/api/data/v1/form',
          formConfigDirPath: '/data/form',
        },
        frameworkServiceConfig: {
          channelApiPath: '/api/channel/v1',
          frameworkApiPath: '/api/framework/v1',
          frameworkConfigDirPath: '/data/framework',
          channelConfigDirPath: '/data/channel',
          searchOrganizationApiPath: '/api/org/v1',
          systemSettingsDefaultChannelIdKey: 'custodianOrgId'
        },
        profileServiceConfig: {
          profileApiPath: '/api/user/v1',
          tenantApiPath: '/v1/tenant',
          otpApiPath: '/api/otp/v1',
          searchLocationApiPath: '/api/data/v1'
        },
        pageServiceConfig: {
          apiPath: '/api/data/v1',
        },
        appConfig: {
          maxCompatibilityLevel: 4,
          minCompatibilityLevel: 1
        },
        systemSettingsConfig: {
          systemSettingsApiPath: '/api/data/v1',
          systemSettingsDirPath: '/data/system',
        },
        telemetryConfig: {
          deviceRegisterApiPath: '',
          telemetryApiPath: '/api/data/v1',
          deviceRegisterHost: buildConfigValues.DEVICE_REGISTER_BASE_URL,
          telemetrySyncBandwidth: 200,
          telemetrySyncThreshold: 300,
          telemetryLogMinAllowedOffset: 86400000
        },
        sharedPreferencesConfig: {
          debugMode: false
        },
        playerConfig: {
          showEndPage: false,
          splash: {
            webLink: '',
            text: '',
            icon: '',
            bgImage: 'assets/icons/splacebackground_1.png'
          },
          overlay: {
            enableUserSwitcher: false,
            showUser: false
          }
        }
      });
    };
  };


declare const buildconfigreader;
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    IonicImageLoader.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateHttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: true,
      // autoFocusAssist: false
    }),
    IonicImageLoader.forRoot(),
    DirectivesModule,

    // custom modules
    LanguageSettingsPageModule,
    UserTypeSelectionPageModule
  ],
  providers: [
    StatusBar,
    AppVersion,
    SocialSharing,
    WebView,
    SplashScreen, // Migration-TODO
    FileTransferObject,
    FileOpener,
    FileTransfer,
    AppGlobalService,
    CourseUtilService,
    TelemetryGeneratorService,
    QRScannerResultHandler,
    SunbirdQRScanner,
    CommonUtilService,
    LogoutHandlerService,
    TncUpdateHandlerService,
    ContainerService,
    UniqueDeviceID,
    UtilityService,
    AppHeaderService,
    AppRatingService,
    Device,
    Network,
    AndroidPermissionsService,
    ComingSoonMessageService,
    NotificationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ...sunbirdSdkServicesProvidersFactory(),
    // { provide: ErrorHandler},
    { provide: APP_INITIALIZER, useFactory: sunbirdSdkFactory, deps: [], multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translate: TranslateService) {
      this.setDefaultLanguage();
  }

  private setDefaultLanguage() {
    this.translate.setDefaultLang('en');
  }
}
