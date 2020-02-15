(function () {
   // setup

   var grid = document.querySelector('.letter-grid');
   var gridWidth;
   var gridHeight;
   var letterWidth = 20; // @todo: make this dynamic
   var letterHeight = 20; // @todo: make this dynamic
   var totalLetters;
   var letterArray = [];
   var currentLetters = 0;
   var resizeCount = 0;

   // the unicode values that we want to loop through (A-Z)
   // http://www.codingforums.com/showpost.php?s=ca38992f8716f43d325c12be6fc0198b&p=843844&postcount=3

   var charCodeRange = {
      start: 65,
      end: 90
   };

   // get the grid's width and height

   function getDimensions() {
      var gridRect = document.documentElement.getBoundingClientRect();
      gridWidth = 3000;
      gridHeight = 2000;
      console.log('Grid width: ' + gridWidth, '\nGrid height: ' + gridHeight);
   }

   // get the total possible letters needed to fill the grid
   // and store that in totalLetters

   function getTotalLetters() {
      var multiplierX = gridWidth / letterWidth;
      var multiplierY = gridHeight / letterHeight;
      totalLetters = Math.round((multiplierX * multiplierY));
      console.log('multiplierX: ' + multiplierX, '\nmultiplierY: ' + multiplierY, '\ntotalLetters: ' + totalLetters);
   }

   // loop through the unicode values and push each character into letterArray

   function populateLetters() {
      for (var i = charCodeRange.start; i <= charCodeRange.end; i++) {
         letterArray.push(String.fromCharCode(i));
      }
      console.log('letterArray: ' + letterArray, '\nletterArray.length: ' + letterArray.length);
   }

   // a function to loop a given number of times (value), each time
   // appending a letter from the letter array to the grid

   function drawLetters(value) {
      var text;
      var span;
      var count = 0;

      for (var letter = 0; letter <= value; letter++) {
         text = document.createTextNode(letterArray[count]);
         span = document.createElement('span');
         span.appendChild(text);
         grid.appendChild(span);
         count++;

         // if our count equals the length of our letter array, then that
         // means we've reached the end of the array (Z), so we set count to 
         // zero again in order to start from the beginning of the array (A).
         // we keep looping over the letter array 'value' number of times.

         if (count === letterArray.length) {
            count = 0;
         }

         // if our for counter var (letter) equals the passed in value argument
         // then we've finished our loop and we throw a class onto the grid element

         if (letter === value) {
            grid.classList.add('js-show-letters');
         }
      }
   }

   // get the length of the grid.find('span') jQuery object
   // essentially the current number of letters in the grid at this point

   function getCurrentLetters() {
      currentLetters = grid.querySelectorAll('span').length;
      console.log('currentLetters: ' + currentLetters);
   }

   function init() {
      populateLetters();
      getDimensions();
      getTotalLetters();
      drawLetters(totalLetters);
      getCurrentLetters();
   }

   function onResize() {
      console.log('\nresizeCount: ' + resizeCount + '\n');
      resizeCount++;
      getDimensions();
      getTotalLetters();

      // here we're looking to see if the current number of letters in the grid
      // (currentLetters) is less than the total possible letters
      // if so, we figure out how many need to be added to fill it up, then draw them

      if (currentLetters < totalLetters) {
         var difference = totalLetters - currentLetters;
         drawLetters(difference);
      }

      // update currentLetters with the current number of letters in the grid

      getCurrentLetters();
   }

   init();

   // do everything we've done so far, except on window resize using debounce to 
   // ensure that resize isn't going nuts firing all this code constantly

   window.addEventListener('resize', _.debounce(onResize, 100));
})();