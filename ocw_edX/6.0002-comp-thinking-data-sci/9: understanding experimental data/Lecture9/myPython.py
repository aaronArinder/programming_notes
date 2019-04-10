# -*- coding: utf-8 -*-

import random, pylab, numpy, argparse, Gnuplot

# pass in args from terminal
parser = argparse.ArgumentParser()
parser.add_argument("--file", "-f", type=str, required=True)
fileName = parser.parse_args()

def plotData(fileName):
  xVals, yVals = getData(fileName)
  xVals = pylab.array(xVals)
  yVals = pylab.array(yVals)
  xVals = pylab.array(yVals)
  xVals = xVals*9.81
#  pylab.plot(xVals, yVals, 'bo',
#             label = 'Measured displacements')
  Gnuplot.plot(xVals, yVals, 'bo',
             label = 'Measured displacements')
