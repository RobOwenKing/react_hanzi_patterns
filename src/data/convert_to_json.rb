# Dictionary from https://github.com/skishore/makemeahanzi

file = File.open('dictionary.txt')

data = file.read.gsub(/\n/, ",\n")

File.open('dictionary.json', 'w') { |f| f.write "[#{data}]" }
