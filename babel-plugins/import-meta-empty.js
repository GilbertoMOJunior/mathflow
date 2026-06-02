// Substitui o meta-property `import.meta` por `({})`.
// Motivo: zustand/middleware usa `import.meta.env` (estilo Vite). No bundle web
// do Metro (script clássico, não module) o token `import.meta` gera erro de
// parse: "Cannot use 'import.meta' outside a module". Trocando por `{}`, o
// token some e `import.meta.env` vira `undefined` (os guards já tratam isso).
module.exports = function ({ types: t }) {
  return {
    name: 'import-meta-empty',
    visitor: {
      MetaProperty(path) {
        const n = path.node;
        if (n.meta && n.meta.name === 'import' && n.property.name === 'meta') {
          path.replaceWith(t.objectExpression([]));
        }
      },
    },
  };
};
