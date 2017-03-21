# Motionat0r-54

## Libraries
* Johnny-Five -  http://johnny-five.io/
* Express - https://expressjs.com/
* Socket.io - https://socket.io/

## Hardware Components
* 1 x Arduino Uno
* 1 x USB Cable A
* 2 x LEDs
* 1 x Motion Sensor
* 7 x Jumper Cables

## Hardware Setup
![Hardware diagram](https://github.com/ljket1/Motionat0r-54/blob/master/Hardware%20diagram.png)
### Hardware connections
* LED 
	* Connect positive end of LED to PIN 13 on the Arduino
	* Connect negative end of LED to GND pin on Arduino
* PIR Sensor
	* Connect 5V Arduino output to the 5V input on the PIR Sensor
	* Connect the GND pin on the PIR Sensor to the GND socket on the Arduino
	* Connect the Output pin on the PIR Sensor to PIN 2 on the Arduino.

## Instructions
### Arduino
1. Launch Arduino IDE
2. Set the Serial Port in the IDE: Tools / Port / (Arduino)
3. Select File / Examples / Firmata / Standard Firmata
4. Select Sketch / Upload

### Server
1. `npm install`
2. `node index.js`

#### IP Address
Run the following script for an easy way to see public IP Address
* `./ip.sh`

## Features
* Logs Motions - Short and Long
* Adjustable Motion Determination (Minimum: 6 Seconds)
* Turn LED on/off
* Turn Motion Sensor on/off
