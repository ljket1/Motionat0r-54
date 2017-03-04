/*
 * FIT3140 Assignment 1
 * 
 * Notes: 
 * - Need to wait until led flashes for next motion? 
 * - Add new feature where user can change long motion threshold (minimum 6 seconds)?
 * 
 * Todo:
 * - Add ability to enable/disable led functionality
 * - Add ability to switch motion sensor on and off (i.e. stop reading data)
 */
 
const int ledPin = 4;                  // Pin for LED 
const int inputPin = 2;                 // Pin for PIR sensor input


int pirState = LOW;             // we start, assuming no motion detected
int sensorVal = 0;              // variable for reading the pin status; 1 = motion detected, 0 = no motion detected
int numOfShortMotion = 0;
int numOfLongMotion = 0;
int numOfTotalMotion = 0;

boolean sensorStatus = true;    // If true, sensor reads data. If false, sensor will not read data.
boolean ledStatus = true;       // If true, leds are enabled (lights up when motion is detected). If false, leds will not activate under any circumstances.

unsigned long previousMillis = 0;           // Stores the time motion was initially detected when the state changes
unsigned long totalDurationMillis = 0;      // Stores the duration of when motion was detected
unsigned long longMotionThreshold = 6000;   // Stores the threshold of what defines a long motion from a short motion
 
void setup() {
  pinMode(ledPin, OUTPUT);      // declare LED as output
  pinMode(inputPin, INPUT);     // declare sensor as input
  
  Serial.begin(115200);
}
 
void loop(){
  sensorVal = digitalRead(inputPin);         // Reads data from motion sensor
  
  if (sensorVal) {                           // If motion is detected
    digitalWrite(ledPin, HIGH);              // Turn LED ON    
    if (pirState == LOW) {
      //Serial.println("Motion detected!");
      previousMillis = millis();
      pirState = HIGH;
    }
  } else {
    digitalWrite(ledPin, LOW);                // Turn LED OFF
    if (pirState == HIGH){
      
      totalDurationMillis = millis() - previousMillis; 

      if(totalDurationMillis < 0){ totalDurationMillis = 0;}  

      if(totalDurationMillis > longMotionThreshold){ // If duration of motion exceeds threshold of being "short"
        //Serial.println("Long motion detected");
        numOfLongMotion++;
        //Serial.println(String(numOfLongMotion) + " numLMotion");
      }
      else{
        //Serial.println("Short motion detected");
        numOfShortMotion++;
        //Serial.println(String(numOfShortMotion) + " numSMotion");
      }

      numOfTotalMotion = numOfShortMotion + numOfLongMotion;

      delay(200);
      //Serial.println(String(numOfTotalMotion) + " numTotal");

      Serial.println("STATS: " + (String)numOfTotalMotion + " " + (String)numOfShortMotion + " " + (String)numOfLongMotion);
      
      delay(200);
      //Serial.println("Duration: " + (String)totalDurationMillis + "ms"); // Debugging purposes (Since the sensor has a minimum of ~5s detection, this will not be accurate under 5s)

      //Serial.println("Motion ended!\n\nNumber of total short motions: " + (String)numOfShortMotion + "\nNumber of total long motions: " + (String)numOfLongMotion + "\nTotal number of motions detected: " + (String)(numOfTotalMotion) + "\n"); // Debugging purposes
      
      pirState = LOW;
    }
  }
}

void toggleLed(boolean u_input){
  // todo
}

void toggleSensor(boolean u_input){
  // todo
}

