import * as ts from 'typescript';

function getFunctionName(node: ts.ArrowFunction): string {
  let parent = node.parent;
  while (parent) {
    if (ts.isVariableDeclaration(parent) && parent.name.getText() !== undefined) {
      return parent.name.getText();
    }
    if (ts.isPropertyAssignment(parent) && parent.name.getText() !== undefined) {
      return parent.name.getText();
    }
    parent = parent.parent;
  }
  return 'anonymous';
}

function extractFunctionSignatures(fileName: string): string {
  const program = ts.createProgram([fileName], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(fileName);

  if (!sourceFile) {
    throw new Error(`Could not find source file: ${fileName}`);
  }

  const methods: string[] = [];

  function visit(node: ts.Node): void {
    if (
      ts.isArrowFunction(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isMethodSignature(node) ||
      ts.isMethodDeclaration(node)
    ) {
      const signature = checker.getSignatureFromDeclaration(node);
      if (signature) {
        const parameters = signature.parameters.map((param) => {
          if (param.valueDeclaration) {
            return param.valueDeclaration?.getText();
          }
          return `${param.name}:${checker.typeToString(checker.getTypeOfSymbol(param))}`;
        });
        const returnType = checker.typeToString(signature.getReturnType());
        const functionName = node.name?.getText() || getFunctionName(node as ts.ArrowFunction);
        const functionSignature = `${functionName}(${parameters.join(',')})=>${returnType}`;
        methods.push(functionSignature);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return JSON.stringify({ methods }, null, 2);
}

const fileName = 'src/contracts/erc20.ts';
const jsonOutput = extractFunctionSignatures(fileName);
console.log(jsonOutput);
