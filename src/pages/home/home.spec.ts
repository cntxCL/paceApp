import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RSSFeedReader } from '../../app/app.component';
import { HomePage } from './home';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Home Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [RSSFeedReader, HomePage],

      providers: [

      ],

      imports: [
        IonicModule.forRoot(RSSFeedReader)
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomePage);
    comp    = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });



  it('test that list view contains rss feed items', () => {

    //load http rss request data

    //instantiate HomePage and make sure loadRssData runs

    //verify that the count of items in the list view matches the size of results from the rss feed

    //vspot check a few items in the list against the http request


  });


  it('test that cached data is loaded when we are unable to connect to the network', () => {

    //load http rss request data

    //instantiate HomePage and make sure loadRssData runs

    //verify that the count of items in the list view matches the size of results from the rss feed

    //vspot check a few items in the list against the http request


  });



});
