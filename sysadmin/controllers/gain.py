# -*- coding: utf-8 -*-

from shannon import calcConditionalEntropy, calcConditionalSplite


def calcInformationGain(dataSet, baseEntropy, i):
    '''
    计算信息增益
    :param dataSet:数据集
    :param baseEntropy:数据集的信息熵
    :param i: 特征维度i
    :return: 特征i对数据集的信息增益g(D|X_i)
    '''
    featList = [example[i] for example in dataSet]  # 第i维特征列表
    uniqueVals = set(featList)  # 转换成集合
    newEntropy = calcConditionalEntropy(dataSet, i, featList, uniqueVals)
    infoGain = baseEntropy - newEntropy  # 信息增益，就yes熵的减少，也就yes不确定性的减少
    return infoGain


def calcInformationGainRatio(dataSet, baseEntropy, i):
    '''
    计算信息增益比
    :param dataSet:数据集
    :param baseEntropy:数据集的信息熵
    :param i: 特征维度i
    :return: 特征i对数据集的信息增益比gR(D|X_i)
    '''
    gain = calcInformationGain(dataSet, baseEntropy, i)
    splitInfo = calcSplitInfomation(dataSet, i)
    return gain/splitInfo


def calcSplitInfomation(dataSet, i):
    featList = [example[i] for example in dataSet]  # 第i维特征列表
    uniqueVals = set(featList)
    spliteInfo = calcConditionalSplite(featList, uniqueVals)
    return spliteInfo if spliteInfo != 0 else 1

