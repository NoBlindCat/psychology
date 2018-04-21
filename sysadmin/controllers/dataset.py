# -*- coding: utf-8 -*-

from c45 import createTree
# from c45_view import createPlot


def createDataSet():
    dataSet = [['health','mild','health','health','health','mild','health','mild','health','mild','A'],
               ['health','health','health','health','health','health','health','mild','health','health','A'],
               ['health','mild','health','health','health','health','health','health','health','health','A'],
               ['health','health','health','health','health','health','health','health','health','health','A'],
               ['health','moderate','mild','mild','mild','mild','mild','mild','mild','mild','C'],
               ['health','mild','mild','mild','mild','health','mild','mild','mild','mild','B'],
               ['health','health','health','health','mild','health','health','mild','health','mild','A'],
               ['health','mild','mild','health','health','health','mild','health','health','health','A'],
               ['health','health','health','health','health','health','health','health','health','health','A'],
               ['mild','moderate','severe','moderate','moderate','moderate','mild','moderate','moderate','moderate','D'],
               ['health','mild','mild','mild','mild','health','health','mild','mild','health','B'],
               ['health','mild','health','health','health','health','health','health','health','health','A'],
               ['mild','severe','moderate','severe','severe','severe','moderate','moderate','moderate','moderate','D'],
               ['mild','mild','moderate','moderate','moderate','moderate','moderate','mild','health','mild','C'],
               ['health','mild','mild','health','health','mild','health','mild','health','mild','B'],
               ['health','moderate','mild','health','mild','health','health','health','health','health','B'],
               ['health','mild','mild','mild','health','health','health','health','health','mild','B'],
               ['mild','mild','mild','mild','mild','mild','mild','mild','mild','mild','C'],
               ['health','health','health','health','mild','health','health','mild','health','health','A'],
               ['health','mild','mild','mild','mild','health','mild','mild','mild','health','A'],]
               # ['moderate','moderate','health','health','moderate','health','health','severe','mild','severe','B'],
               # ['moderate','mild','mild','severe','health','mild','health','health','mild','health','B'],
               # ['health','severe','moderate','health','moderate','mild','severe','mild','mild','health','B'],
               # ['health','severe','moderate','mild','severe','health','moderate','severe','mild','mild','C'],
               # ['mild','health','health','mild','moderate','severe','moderate','health','severe','mild','B'],
               # ['mild','moderate','moderate','moderate','health','health','mild','mild','severe','mild','B'],
               # ['severe','health','moderate','severe','severe','moderate','moderate','mild','moderate','severe','C']]
    labels = ['somatization','compulsive','IS','depressed','anxiety','hostility','terror','stubborn','PD','other']
    return dataSet, labels

# if __name__ == "__main__":
#     myDat, labels = createDataSet()
#     myTree = createTree(myDat, labels)
#     print(myTree)
#     createPlot(myTree)