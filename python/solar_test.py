from time import sleep
from serial import Serial

import sys
sys.path.append('/home/pi/tracer/python')
from tracer import Tracer, TracerSerial, QueryCommand

port = Serial('/dev/ttyAMA0', 9600, timeout = 1)
port.flushInput()
port.flushOutput()
tracer = Tracer(0x16)
t_ser = TracerSerial(tracer, port)
query = QueryCommand()

try:
    while 1:
        try:
            t_ser.send_command(query)
            data = t_ser.receive_result()
        except (IndexError, IOError) as e:
            print(e)
            port.flushInput()
            port.flushOutput()
            sleep(4)
            continue

        print('Battery Voltage: {0:0.1f}V'.format(data.batt_voltage))
        print('Solar Panel Voltage: {0:0.1f}V'.format(data.pv_voltage))
        print('Charging Current: {0:0.2f}A'.format(data.charge_current))
        print('Load Current: {0:0.2f}A\n'.format(data.load_amps))
        sleep(4)
        
except KeyboardInterrupt:
    print ("\nCtrl-C pressed.  Closing serial port and exiting...")
finally:
    port.close()
