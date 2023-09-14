//or as a Number prototype method:
Number.prototype.padLeft = (n, str) => {
    return Array(n - String(this).length + 1).join(str || '0') + this;
};

module.exports = class {
    static ConvertTimeStringToSeconds(timeString) {
        var splitTimeArray = timeString.split(':');
        var totalSeconds = 0;
        var multiplier = 60 * 60;
        for (var i = 0; i < splitTimeArray.length; i++) {
            //console.log(splitTimeArray[i]);
            totalSeconds += parseInt(splitTimeArray[i]) * multiplier;
            multiplier = multiplier / 60;
        }
        return totalSeconds;
    }

    static ConvertSecondsToTimeString(timeInSeconds) {
        var hours = Math.floor(timeInSeconds / (60 * 60));
        var minutes = Math.floor((timeInSeconds - (hours * 60 * 60)) / (60));
        var seconds = timeInSeconds % 60;
        return hours.padLeft(2) + ':' + minutes.padLeft(2) + ':' + seconds.padLeft(2);
    }

    static AddSecondsToTime(timeString, secondsToAdd) {
        if (!secondsToAdd) {
            return timeString;
        }
        var timeInSeconds = this.ConvertTimeStringToSeconds(timeString);
        timeInSeconds += parseInt(secondsToAdd);
        return this.ConvertSecondsToTimeString(timeInSeconds);
    }
};
