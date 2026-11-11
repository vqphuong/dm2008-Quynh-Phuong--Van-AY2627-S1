// sensor connected to analog pin A0
const int forcePin = A0; 

void setup() {
  Serial.begin(9600);
}

void loop() {
  // read pressure (0 = none, 1023 = max)
  int forceVal = analogRead(forcePin);
  
  Serial.println(forceVal);
  delay(100);
}