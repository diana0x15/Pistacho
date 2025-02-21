type VocabEntry = {
  word: string;
  clue: string;
};

enum DefinitionType {
  CLUE = "clue",
  TRANSLATION = "translation",
}

export { VocabEntry, DefinitionType };
