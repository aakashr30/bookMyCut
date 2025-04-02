import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

// Enum for notification types
export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

// Notification interface
interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = NotificationType.INFO,
  duration = 3000,
  onClose,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose && onClose();
    });
  };

  // Get background color based on notification type
  const getBackgroundColor = () => {
    switch (type) {
      case NotificationType.SUCCESS:
        return "#4CAF50";
      case NotificationType.ERROR:
        return "#F44336";
      case NotificationType.WARNING:
        return "#FF9800";
      case NotificationType.INFO:
      default:
        return "#2196F3";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Notification Manager to handle multiple notifications
export const NotificationManager = (() => {
  let showNotification: ((props: NotificationProps) => void) | null = null;

  return {
    // Method to register the show notification function
    registerShowNotification: (fn: (props: NotificationProps) => void) => {
      showNotification = fn;
    },

    // Method to show a notification
    show: (props: NotificationProps) => {
      if (showNotification) {
        showNotification(props);
      }
    },
  };
})();

// Notification Container Component
export const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    // Register the show notification method
    NotificationManager.registerShowNotification((props) => {
      setNotifications((current) => [...current, props]);
    });
  }, []);

  const handleClose = (index: number) => {
    setNotifications((current) => current.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.notificationContainer}>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          {...notification}
          onClose={() => handleClose(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    color: "white",
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Notification;
