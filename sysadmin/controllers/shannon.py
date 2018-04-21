# -*- coding: utf-8 -*-

from math import log


def calcShannonEnt(dataSet):
    '''
    计算香农熵,結果為期望值,I(X1,X2,X3,X4)
    :param dataSet:数据集
    :return: 计算结果
    '''
    numEntries = 20
    labelCounts = {}
    for featVec in dataSet: # 遍历每个实例，统计标签的频数
        currentLabel = featVec[-1]
        if currentLabel not in labelCounts.keys():
            labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
    shannonEnt = 0.0
    for key in labelCounts:
        prob = float(labelCounts[key]) / numEntries
        shannonEnt -= prob * log(prob,2) # 以2为底的对数
    return shannonEnt


def splitDataSet(dataSet, axis, value):
    '''
    按照给定特征划分数据集
    :param dataSet:待划分的数据集
    :param axis:划分数据集的特征
    :param value: 需要返回的特征的值
    :return: 划分结果列表
    '''
    retDataSet = []
    for featVec in dataSet:
        if featVec[axis] == value:
            reducedFeatVec = featVec[:axis]     #chop out axis used for splitting
            reducedFeatVec.extend(featVec[axis+1:])
            retDataSet.append(reducedFeatVec)
    return retDataSet


def calcConditionalEntropy(dataSet, i, featList, uniqueVals):
    conditionEnt = 0.0
    for value in uniqueVals:
        subDataSet = splitDataSet(dataSet, i, value)
        prob = len(subDataSet) / float(len(dataSet))  # 极大似然估计概率
        subEntorpy = calcShannonEnt(subDataSet)
        conditionEnt += prob * subEntorpy  # 条件熵的计算
    return conditionEnt


def calcConditionalSplite(featList, uniqueVals):
    conditionalSplite = 0.0
    lenth_of_list = len(featList)
    labelCounts = {}
    for featVec in featList: # 遍历每个实例，统计标签的频数
        currentLabel = featVec
        if currentLabel not in labelCounts.keys():
            labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
    for value in uniqueVals:
        prob = float(labelCounts[value]) / lenth_of_list
        conditionalSplite -= prob * log(prob, 2)
    return conditionalSplite
