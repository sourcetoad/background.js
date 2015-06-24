#Background.js
Changes the background of an element based on the time of day.

##Installation
TODO

##Configuration and Usage
Basic setup requires creating a new Background, passing in an `options` object:
```
var background = new Background(options);
```

The only required options are `day` and `night` filepaths. For example:
```
var background = new Background({
    day:   "../day.png",
    night: "../night.png"
});
```

##Options
TODO

##Methods
TODO


###Contributing
TODO


####Testing
Background uses the [Karma](http://karma-runner.github.io/0.12/index.html) test runner. You can run the tests using `gulp test` or `karma test/run.js`.
