import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";

interface TimeRangePickerProps {
  startHour: number; // Start hour (e.g., 9 for 9:00 AM)
  endHour: number; // End hour (e.g., 17 for 5:00 PM)
  interval: number; // Time interval in minutes (e.g., 15 for 15-minute intervals)
  onRangeSelected: (startTime: string, endTime: string) => void;
  alreadyBookedSlots?: Array<{ start: string; end: string }>; // Booked time slots
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startHour = 9,
  endHour = 17,
  interval = 15,
  onRangeSelected,
  alreadyBookedSlots = [],
}) => {
  const totalMinutes = (endHour - startHour) * 60;
  const totalIntervals = totalMinutes / interval;
  const containerWidth = Dimensions.get("window").width - 40; // Accounting for padding
  const intervalWidth = containerWidth / totalIntervals;

  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(4); // Default to 1 hour (4 intervals of 15 min)

  const leftHandlePos = useRef(new Animated.Value(0)).current;
  const rightHandlePos = useRef(new Animated.Value(intervalWidth * 4)).current;
  const [leftPos, setLeftPos] = useState(0);
  const [rightPos, setRightPos] = useState(intervalWidth * 4);
  useEffect(() => {
    leftHandlePos.addListener(({ value }) => setLeftPos(value));
    rightHandlePos.addListener(({ value }) => setRightPos(value));

    return () => {
      leftHandlePos.removeAllListeners();
      rightHandlePos.removeAllListeners();
    };
  }, []);
  // Convert interval index to time string (e.g., "9:00 AM")
  const indexToTimeString = (index: number): string => {
    const totalMinutes = startHour * 60 + index * interval;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // Check if a time slot is already booked
  const isSlotBooked = (index: number): boolean => {
    const timeString = indexToTimeString(index);
    return alreadyBookedSlots.some(
      (slot) => timeString >= slot.start && timeString < slot.end
    );
  };

  // Update the selected range
  useEffect(() => {
    const startTimeString = indexToTimeString(rangeStart);
    const endTimeString = indexToTimeString(rangeEnd);
    onRangeSelected(startTimeString, endTimeString);
  }, [rangeStart, rangeEnd]);

  // Left handle pan responder````````````````````````````````````````````````````````````````````````````````````````````````````
  const leftHandlePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newPos = gestureState.dx;
        const maxPos = rightHandlePos.__getValue() - intervalWidth;

        // Snap to grid
        const snapIndex = Math.round(newPos / intervalWidth);
        newPos = snapIndex * intervalWidth;

        // Bounds checking
        if (newPos < 0) newPos = 0;
        if (newPos > maxPos) newPos = maxPos;

        // Check if the position corresponds to a booked slot
        const newStartIndex = Math.round(newPos / intervalWidth);
        if (isSlotBooked(newStartIndex)) return;

        leftHandlePos.setValue(newPos);
        setRangeStart(newStartIndex);
      },
      onPanResponderRelease: () => {
        // Snap to the nearest interval when released
        const newStartIndex = Math.round(
          leftHandlePos.__getValue() / intervalWidth
        );
        Animated.spring(leftHandlePos, {
          toValue: newStartIndex * intervalWidth,
          useNativeDriver: false,
        }).start();
        setRangeStart(newStartIndex);
      },
    })
  ).current;

  // Right handle pan responder
  const rightHandlePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newPos = 4 * intervalWidth + gestureState.dx;
        const minPos = leftHandlePos.__getValue() + intervalWidth;

        // Snap to grid
        const snapIndex = Math.round(newPos / intervalWidth);
        newPos = snapIndex * intervalWidth;

        // Bounds checking
        if (newPos < minPos) newPos = minPos;
        if (newPos > containerWidth) newPos = containerWidth;

        // Check if the position corresponds to a booked slot
        const newEndIndex = Math.round(newPos / intervalWidth);
        if (isSlotBooked(newEndIndex - 1)) return;

        rightHandlePos.setValue(newPos);
        setRangeEnd(newEndIndex);
      },
      onPanResponderRelease: () => {
        // Snap to the nearest interval when released
        const newEndIndex = Math.round(
          rightHandlePos.__getValue() / intervalWidth
        );
        Animated.spring(rightHandlePos, {
          toValue: newEndIndex * intervalWidth,
          useNativeDriver: false,
        }).start();
        setRangeEnd(newEndIndex);
      },
    })
  ).current;

  // Generate time labels
  const timeLabels = [];
  for (let i = 0; i <= totalIntervals; i += 4) {
    // Show every hour
    const time = indexToTimeString(i);
    const position = i * intervalWidth;
    timeLabels.push(
      <Text key={i} style={[styles.timeLabel, { left: position - 20 }]}>
        {time}
      </Text>
    );
  }

  // Generate interval markers
  const intervalMarkers = [];
  for (let i = 0; i <= totalIntervals; i++) {
    const isHour = i % 4 === 0;
    const position = i * intervalWidth;
    intervalMarkers.push(
      <View
        key={i}
        style={[
          styles.intervalMarker,
          { left: position, height: isHour ? 12 : 8 },
          isHour && styles.hourMarker,
        ]}
      />
    );
  }

  // Generate booked slot markers
  const bookedSlotMarkers = [];
  for (let i = 0; i < totalIntervals; i++) {
    if (isSlotBooked(i)) {
      const position = i * intervalWidth;
      bookedSlotMarkers.push(
        <View
          key={`booked-${i}`}
          style={[styles.bookedSlot, { left: position, width: intervalWidth }]}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Appointment Time</Text>

      <View style={styles.timelineContainer}>
        {/* Time labels */}
        <View style={styles.labelsContainer}>{timeLabels}</View>

        {/* Timeline bar */}
        <View style={styles.timeline}>
          {intervalMarkers}
          {bookedSlotMarkers}

          {/* Selected range */}
          <Animated.View
            style={[
              styles.selectedRange,
              {
                left: leftHandlePos,
                width: Animated.subtract(rightHandlePos, leftHandlePos),
              },
            ]}
          />

          {/* Left handle */}
          <Animated.View
            style={[styles.handle, { left: leftHandlePos }]}
            {...leftHandlePanResponder.panHandlers}
          >
            <View style={styles.handleKnob} />
          </Animated.View>

          {/* Right handle */}
          <Animated.View
            style={[styles.handle, { left: rightHandlePos }]}
            {...rightHandlePanResponder.panHandlers}
          >
            <View style={styles.handleKnob} />
          </Animated.View>
        </View>
      </View>

      {/* Display selected range */}
      <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTimeText}>
          {indexToTimeString(rangeStart)} - {indexToTimeString(rangeEnd)}
        </Text>
        <Text style={styles.durationText}>
          Duration: {(rangeEnd - rangeStart) * interval} min
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 16,
  },
  timelineContainer: {
    height: 70,
    marginTop: 20,
  },
  labelsContainer: {
    position: "absolute",
    width: "100%",
    height: 20,
    top: -20,
  },
  timeLabel: {
    position: "absolute",
    color: "#ccc",
    fontSize: 12,
    width: 40,
    textAlign: "center",
  },
  timeline: {
    position: "relative",
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    marginTop: 10,
  },
  intervalMarker: {
    position: "absolute",
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    bottom: 0,
  },
  hourMarker: {
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  bookedSlot: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 4,
  },
  selectedRange: {
    position: "absolute",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
  },
  handle: {
    position: "absolute",
    width: 20,
    height: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
    zIndex: 1,
  },
  handleKnob: {
    width: 10,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  selectedTimeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedTimeText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  durationText: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
});

export default TimeRangePicker;
