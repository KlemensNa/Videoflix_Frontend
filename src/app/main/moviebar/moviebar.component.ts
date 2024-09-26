import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { VideoService } from 'src/app/services/video.service';



@Component({
  selector: 'app-moviebar',
  templateUrl: './moviebar.component.html',
  styleUrls: ['./moviebar.component.scss']
})
export class MoviebarComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  videos: any[] = [];
  ballsport: any[] = [];
  ussport: any[] = [];
  golf: any[] = [];
  football: any[] = [];
  handball: any[] = [];
  basketball: any[] = [];
  baseball: any[] = [];
  skate: any[] = [];
  boxing: any[] = [];
  amfootball: any[] = [];
  sportsData: any[] = [];
  currentlyPlayingVideoID: any = null;
  resizeListener: any;
  searchTermSubscription: Subscription | undefined;
  preview: boolean = false;
  actualThumbnail: any;
  actualTitle: string = '';
  actualDescription: string = '';
  videoURL: string = '';


  constructor(
    private videoService: VideoService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }


  /**
   * subscribe videos of the backend, save all in this.videos and sort videos to categories
   * init EventListener and create Array of all Data
   * subscribe for searchService --> get all searchInputs of navbarComponent
   */
  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.videos = data;
      this.sortVideosToCategory();
      this.filterVideos('');
    });

    this.createDataArray();
    this.initEventListenerForResize()

    this.searchTermSubscription = this.searchService.currentSearchTerm.subscribe(term => {
      this.filterVideos(term);
    });
  }


  /**
  * after Init checkScroll to hide LeftScrollArrows 
  * and only show RightArrows when enough Videos
  */
  ngAfterViewInit() {
    this.sportsData.forEach(sport => {
      setTimeout(() => this.checkScrollButtons((sport.name + 'Scroll')), 500);
    });
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); // Call it here after the view is initialized
  }


  /**
   * remove Eventlistener and SearchTerm, when close this component
   */
  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);

    if (this.searchTermSubscription) {
      this.searchTermSubscription.unsubscribe();
    }
  }

  /**
   * EventListener to call onResize-function, when resize window
   */
  initEventListenerForResize() {
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  /**
   * checks the scrollButtons if called
   */
  onResize() {
    this.sportsData.forEach(sport => {
      this.checkScrollButtons(sport.name + 'Scroll');
    });
  }

  /**
   * move to right
   * @param containerId id of the category container, which can be scrolled
   */
  scrollRight(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: 350, behavior: 'smooth' });
      setTimeout(() => this.checkScrollButtons(containerId), 1000); // Delay to ensure scroll completes
    }
  }

  /**
   * move to left
   * @param containerId id of the category container, which can be scrolled
   */
  scrollLeft(containerId: string) {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollBy({ left: -350, behavior: 'smooth' });
      setTimeout(() => this.checkScrollButtons(containerId), 1000); // Delay to ensure scroll completes
    }
  }


  /**
   * checks if container is completly scrolled to a side and removes scrollBtns if not needed
   * @param containerId id of the category container, which can be scrolled
   */
  checkScrollButtons(containerId: string) {
    const container = document.getElementById(containerId);

    if (container) {
      const leftArrow = document.getElementById(containerId + "Left");
      const rightArrow = document.getElementById(containerId + "Right");

      if (container.scrollLeft === 0) {
        leftArrow!.style.display = 'none';
      } else {
        leftArrow!.style.display = 'flex';
      }

      // +10 because scrollWidth was sometimes 2-3px bigger, so add 10px to make it save
      if (container.scrollWidth <= container.scrollLeft + container.clientWidth + 10) {
        rightArrow!.style.display = 'none';
      } else {
        rightArrow!.style.display = 'flex';
      }
    }
  }


  /**
   * sort every video to a specific category and if exisitng to a "overcategory"
   */
  sortVideosToCategory() {
    this.videos.forEach(video => {
      this.sortToSpecificCategory(video)
      if (video.category) {
        this.sortToMainCategory(video)
      }
    });
  }


  /**
   * creates Arrays out of all categories with all videos inside
   */
  createDataArray() {
    this.sportsData = [
      { name: 'GOLF', videos: this.golf },
      { name: 'Fußball', videos: this.football },
      { name: 'Handball', videos: this.handball },
      { name: 'Basketball', videos: this.basketball },
      { name: 'Baseball', videos: this.baseball },
      { name: 'Skaten', videos: this.skate },
      { name: 'American Football', videos: this.amfootball },
      { name: 'Boxen', videos: this.boxing },
      { name: 'Ballsport', videos: this.ballsport },
      { name: 'US-Sport', videos: this.ussport },
    ];
  }


  /**
   * is called in html when clicked on a video (src)
   * @param videoPath 
   * @returns path of the video to stream it
   */
  getVideoUrl(videoPath: string): string {
    return `http://127.0.0.1:8000${videoPath}`;
  }


  /**
   * open or close video
   * @param video 
   */
  toggleVideo(video: any) {
    video.isplaying = !video.isplaying
  }


  openPreview(videoThumbnail: any, video: any) {
    this.preview = true;
    this.actualThumbnail = this.getVideoUrl(videoThumbnail)
    this.actualTitle = video.title
    this.actualDescription = video.description
    this.videoURL = video.videos_file
    scrollTo(0, 0)

  }


  loadThumbnail() {
    return this.actualThumbnail
  }


  /**
   * sort Videos in "overcategories" 
   * @param video 
   */
  sortToMainCategory(video: any) {
    switch (video.category.toLowerCase()) {
      case 'ballsport':
        this.ballsport.push(video);
        break;
      case 'ussport':
        this.ussport.push(video);
        break;
      default:
        console.warn(`Unknown category: ${video.category}`);
    }
    this.shuffle(this.ballsport)
    this.shuffle(this.ussport)
  }


  /**
   * @param array array of the Maincategory
   * @returns a shuffled Array
   */
  shuffle(array: any) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  /**
   * sort Videos in "specific catergories" 
   * @param video 
   */
  sortToSpecificCategory(video: any) {
    switch (video.sport.toLowerCase()) {
      case 'golf':
        this.golf.push(video);
        break;
      case 'football':
        this.football.push(video);
        break;
      case 'handball':
        this.handball.push(video);
        break;
      case 'basketball':
        this.basketball.push(video);
        break;
      case 'baseball':
        this.baseball.push(video);
        break;
      case 'skate':
        this.skate.push(video);
        break;
      case 'boxing':
        this.boxing.push(video);
        break;
      case 'amfootball':
        this.amfootball.push(video);
        break;
      default:
        console.warn(`Unknown category: ${video.category}`);
    }
  }


  /**
   * filter videos when trigger search function and render new when changes detected
   * filter by title
   * @param term input of the searchfield
   */
  filterVideos(term: string) {
    this.sportsData.forEach(sport => {
      if (term === '') {
        sport.filteredVideos = [...sport.videos];
      } else {
        sport.filteredVideos = ''
        sport.filteredVideos = sport.videos.filter((video: any) =>
          video.title.toLowerCase().includes(term.toLowerCase())
        );
      }
    });
    this.cdr.detectChanges();
  }


  openVideo() {
    const videoData = {
      // thumbnail: this.actualThumbnail,
      title: this.actualTitle,
      // description: this.actualDescription,
      videoURL: this.videoURL
    };
    this.videoService.setVideoData(videoData);
    this.router.navigate([`/video/${this.actualTitle}`])
  }


  adjustLayout() {
    const moviecontainer = document.querySelector('.moviecontainer')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      moviecontainer.style.width = "calc(100vw - 100px)";
    } else {
      moviecontainer.style.width = "calc(100vw - 80px)";
    }
  }


}