# Guide d'Organisation des Notes

## Structure des Dossiers
```
notes/
├── YYYY/             # Année
│   ├── MM/          # Mois (format 01-12)
│   │   ├── DD/      # Jour (format 01-31)
│   │   │   ├── HH/  # Heure simple (format 01-24)
│   │   │   └── HH-MM/  # Heure-Minute pour plus de précision
```

## Types de Fichiers Standards

### 1. Fichiers de Session (Dans les dossiers horaires)
- `theorique.md` : Documentation théorique, concepts, recherches
  - Concepts techniques
  - Explications détaillées
  - Liens vers ressources
  - Notes de recherche

- `realisations.md` : Suivi des tâches accomplies
  - Liste des tâches terminées
  - Problèmes résolus
  - Modifications effectuées
  - Points bloquants surmontés

### 2. Fichiers de Planification (À la racine d'un jour)
- `taches_demain.md` : Planning des tâches à venir
  - Liste des objectifs
  - Points à aborder
  - Ressources nécessaires

### 3. Documentation Spécifique
- Nommer explicitement avec le sujet : `SUJET_explique.md`
- Pour les exemples pratiques : `SUJET_exemples_pratiques.md`
- Pour les plans détaillés : `SUJET_detaille.md`

## Conventions de Rédaction

### Format des Notes Théoriques
```markdown
# [Sujet Principal]

## Contexte
[Brève introduction du sujet]

## Points Clés
- Point 1
- Point 2

## Détails Techniques
[Explications détaillées]

## Ressources
- [Liens]
- [Références]
```

### Format des Réalisations
```markdown
# Réalisations du [Date]

## Tâches Accomplies
- [ ] Tâche 1
  - Détails
  - Problèmes rencontrés/résolus
- [x] Tâche 2

## Points Bloquants
- [Description du problème]
  - Solution trouvée/à explorer

## Notes pour la Suite
[Points à considérer pour les prochaines étapes]
```

## Bonnes Pratiques
1. Créer un nouveau dossier pour chaque nouvelle session de travail
2. Toujours inclure les fichiers `theorique.md` et `realisations.md` dans les sessions
3. Utiliser des liens entre les fichiers pour référencer des informations connexes
4. Maintenir une structure cohérente dans tous les documents
5. Dater systématiquement les entrées
6. Utiliser des tags pour faciliter la recherche (#bug, #feature, #doc, etc.)
