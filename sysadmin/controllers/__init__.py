from dataset import createDataSet
from c45 import createTree

data, labels = createDataSet()

my_tree = createTree(data, labels)
print(my_tree)