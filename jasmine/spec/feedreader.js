/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a valid URL', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        it('has a valid name', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    describe('The menu', function () {

        it('is hidden by default', function () {
            let classList = document.body.classList;
            expect(classList.contains('menu-hidden')).toBe(true);
        });

        it('is shown and hidden on click', function () {
            let menuIconLink = document.querySelector('a.menu-icon-link');
            let classList = document.body.classList;
            expect(classList.contains('menu-hidden')).toBe(true);

            menuIconLink.click();
            expect(classList.contains('menu-hidden')).toBe(false);
            menuIconLink.click();
            expect(classList.contains('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('has at least a single entry', function () {
            let feeds = document.querySelector('div.feed');
            expect(feeds.children.length).toBeGreaterThan(0);
        });
    });


    describe('New Feed Selection', function () {

        let feed1, feed2;

        beforeEach(function (done) {
            // Load the first feed
            loadFeed(0, function () {
                feed1 = document.querySelector('div.feed').innerHTML;
                done();
            });
        });

        it('has new content', function (done) {
            // Load the second feed
            loadFeed(1, function () {
                feed2 = document.querySelector('div.feed').innerHTML;
                expect(feed1).not.toBe(feed2);
                done();
            })
        });
    });

}());
